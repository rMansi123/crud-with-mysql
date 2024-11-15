/* eslint-disable  */
const connection = require("./../db/connection");

exports.getPeoples = async (req, res) => {
  connection.query("SELECT * FROM people", (err, result) => {
    if (err) {
      console.log("error getting users", err);
      return res.status(500).json({ message: "Error fetching users" });
    }
    res.json(result);
  });
};

exports.addPeople = async (req, res) => {
  const { name, email } = req.body;

  try {
    // Ensure both name and email are provided
    if (!name || !email) {
      return res.status(400).json({ message: "Name and email are required" });
    }
    const query = "INSERT INTO people (name, email) VALUES (?,?)";
    connection.query(query, [name, email], (err, result) => {
      if (err) {
        console.log("error inserting people", err);
        return res.status(500).json({ message: "Error inserting people" });
      }
      res.json({ success: true, message: "Successfullly inserted people" });
    });
  } catch (error) {
    console.error("Error adding people", error);
  }
};

exports.deletePeople = async (req, res) => {
  const id = req.params.id;
  const query = "DELETE FROM people WHERE id= ?";
  try {
    connection.query(query, [id], (err) => {
      if (err) {
        console.log("error deleting people", err);
        return res.status(500).json({ message: "Error deleting people" });
      }
      res.json({ success: true, message: "Successfullly deleted people" });
    });
  } catch (err) {
    console.error("Error while deleting people", err);
  }
};

exports.updatePeople = async (req, res) => {
  const { id, name, email } = req.body;
  try {
    const query = "UPDATE people SET name = ? , email = ? WHERE id = ?";
    connection.query(query, [name, email, id], (err) => {
      if (err) {
        console.error("Error updating person", err);
        return res.status(500).json({ message: "Error updating people" });
      }
      res.json({ success: true, message: "Updated people successfully!!" });
    });
  } catch (error) {
    console.error("Error while updating people", err);
  }
};
