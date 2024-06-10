import { Link } from "react-router-dom";
import { Button, Item } from "semantic-ui-react";
import { Book } from "../../../app/models/book";
import { useStore } from "../../../app/stores/store";
import { SyntheticEvent, useState } from "react";

interface Props {
  book: Book;
}

export default function BookListItem({ book }: Props) {
  const { bookStore } = useStore();
  const { deleteBook, loading } = bookStore;
  const [target, setTarget] = useState("");

  function handleBookDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
    setTarget(e.currentTarget.name);
    deleteBook(id);
  }

  return (
    <Item key={book.id}>
      <Item.Content>
        <Item.Header as="a">{book.title}</Item.Header>
        <Item.Description>
          <div>{book.author}</div>
        </Item.Description>
        <Item.Extra>
          <Button
            as={Link}
            to={`/books/${book.id}`}
            floated="right"
            content="View"
            color="blue"
          />
          <Button
            name={book.id}
            loading={loading && target === book.id}
            onClick={(e) => handleBookDelete(e, book.id)}
            floated="right"
            content="Delete"
            color="red"
          />
        </Item.Extra>
      </Item.Content>
    </Item>
  );
}
