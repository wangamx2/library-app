import { Button, Form, Segment } from "semantic-ui-react";
import { ChangeEvent, useEffect, useState } from "react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Book } from "../../../app/models/book";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { v4 as uuid } from "uuid";

export default observer(function BookForm() {
  const { bookStore } = useStore();
  const { addBook, updateBook, loading, loadBook, loadingInitial } =
    bookStore;

  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState<Book>({
    id: "",
    title: "",
    author: ""
  });

  useEffect(() => {
    if (id) loadBook(id).then((book) => setBook(book!));
  }, [id, loadBook]);

  function handleSubmit() {
    if (!book.id) {
      book.id = uuid();
      addBook(book).then(() => navigate(`/books/${book.id}`));
    } else {
      updateBook(book).then(() => navigate(`/books/${book.id}`));
    }
  }

  function handleInputChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;
    setBook({ ...book, [name]: value });
  }

  if (loadingInitial) return <LoadingComponent content="Loading book..." />;

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit} autoComplete="off">
        <Form.Input
          placeholder="Title"
          value={book.title}
          name="title"
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="Author"
          value={book.author}
          name="author"
          onChange={handleInputChange}
        />
        <Button
          loading={loading}
          floated="right"
          positive
          type="submit"
          content="Submit"
        />
        <Button
          as={Link}
          to="/books"
          floated="right"
          type="button"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
});
