import Todo from "../models/Todo.model.js";

// Create a new todo
export const createTodo = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    const todo = await Todo.create({
      title,
      description,
      status,
      user: req.user._id,
    });

    res.status(201).json({ success: true, data: todo });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      message: "Error creating todo",
    });
  }
};

// Get all todos for the authenticated user
export const getTodos = async (req, res) => {
  try {
    let { page = 1, limit = 10, status, search } = req.query;

    page = Number(page);
    limit = Number(limit);

    const query = {
      user: req.user._id,
    };

    if (status) {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const todos = await Todo.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Todo.countDocuments(query);

    res.status(200).json({
      success: true,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: todos,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
        error: error.message,
      message: "Error fetching todos",
    });
  }
};

// Update a todo
export const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await Todo.findOneAndUpdate(
      { _id: id, user: req.user._id },
      req.body,
      { new: true },
    );

    if (!todo) {
      return res
        .status(404)
        .json({ success: false, message: "Todo not found" });
    }

    res.status(200).json({ success: true, data: todo });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      message: "Error updating todo",
    });
  }
};

// Delete a todo
export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await Todo.findOneAndDelete({
      _id: id,
      user: req.user._id,
    });

    if (!todo) {
      return res
        .status(404)
        .json({ success: false, message: "Todo not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      message: "Error deleting todo",
    });
  }
};
