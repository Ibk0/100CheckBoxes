// src/sockets.js
module.exports = (io, db) => {
  io.on("connection", (socket) => {
    console.log("New user connected");

    socket.on("checkboxChange", async (index, value) => {
      try {
        const result = await db.query(
          "SELECT state FROM checkboxes WHERE id = 1"
        );
        const state = result.rows[0].state;
        state[index] = value;
        await db.query("UPDATE checkboxes SET state = $1 WHERE id = 1", [
          state,
        ]);
        io.emit("checkboxChange", index, value);
      } catch (err) {
        console.error(err);
      }
    });
  });
};
