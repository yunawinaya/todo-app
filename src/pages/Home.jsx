import { Container, Card, Badge, Col, Row, Button } from "react-bootstrap";
import { useContext } from "react";
import { TodoContext } from "../contexts/TodoContext";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const todos = useContext(TodoContext).todos;
  const setTodos = useContext(TodoContext).setTodos;

  function handleDelete(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  return (
    <Container>
      <h1 className="my-3">Your todos</h1>
      <Row>
        <CardGroup todos={todos} handleDelete={handleDelete} />
      </Row>
    </Container>
  );
}

function CardGroup({ todos, handleDelete }) {
  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  return todos.map((todo) => {
    const completed = todo.completed;
    const bg = completed ? "success" : "danger";
    return (
      <Col md={4} key={todo.id}>
        <Card className="my-3">
          <Card.Body>
            <Card.Title>{todo.title}</Card.Title>
            <Card.Text>{todo.description}</Card.Text>
            <Badge bg={bg}>{!completed && "Not"} Completed</Badge>
          </Card.Body>
          <Card.Footer>
            <Button variant="warning" onClick={() => handleDelete(todo.id)}>
              Delete
            </Button>
            <Button
              variant="primary"
              onClick={() => handleEdit(todo.id)}
              className="mx-2"
            >
              Edit
            </Button>
          </Card.Footer>
        </Card>
      </Col>
    );
  });
}
