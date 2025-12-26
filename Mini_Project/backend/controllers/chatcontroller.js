const Message = require("../models/Message");

exports.sendMessage = (req, res) => {
  const { receiver_id, message } = req.body;

  if (!receiver_id || !message) {
    return res.status(400).json({ message: "Missing fields" });
  }

  Message.send(
    {
      sender_id: req.user.id,
      receiver_id,
      message
    },
    err => {
      if (err) {
        return res.status(500).json({ message: "Failed to send message" });
      }
      res.json({ message: "Message sent" });
    }
  );
};

exports.getChat = (req, res) => {
  const otherUserId = req.params.userId;

  Message.getChat(
    req.user.id,
    otherUserId,
    (err, rows) => {
      if (err) {
        return res.status(500).json({ message: "Failed to load chat" });
      }
      res.json(rows);
    }
  );
};
