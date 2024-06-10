import { Item, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import BookListItem from "./BookListItem";

export default observer(function BookList() {
  const { bookStore } = useStore();
  const { booksByName } = bookStore;

  return (
    <Segment>
      <Item.Group divided>
        {booksByName.map((book) => (
          <BookListItem key={book.id} book={book} />
        ))}
      </Item.Group>
    </Segment>
  );
});
