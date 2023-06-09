import { useContext, useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { TodoContext } from "../contexts/TodoContext";
import { useNavigate } from "react-router-dom";

export default function AddTodo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);
  const setTodos = useContext(TodoContext).setTodos;
  const todos = useContext(TodoContext).todos;
  const navigate = useNavigate();

  return (
    <Container>
      <h1 className="my-3">Add Todo</h1>
      <Form
        onSubmit={function (event) {
          event.preventDefault();
          setTodos([
            ...todos,
            { id: Date.now(), title, description, completed },
          ]);
          navigate("/");
        }}
      >
        <Form.Group className="mb-3" controlId="titleForm">
          <Form.Label>Title</Form.Label>
          <Form.Control
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Get software developer job"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="descriptionForm">
          <Form.Label>Description</Form.Label>
          <Form.Control
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            as="textarea"
            rows={3}
            placeholder={`1. Create amazing project\n2. Apply to Google & Netflix\n3. Crush interview`}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check
            type="checkbox"
            id="completed"
            label="Mark as completed"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
            className="mb-3"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}
