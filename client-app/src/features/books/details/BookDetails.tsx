import { Button, Card } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { observer } from "mobx-react-lite";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";

export default observer(function BookDetails() {
  const { bookStore } = useStore();
  const { selectedBook: book, loadBook, loadingInitial } = bookStore;
  const { id } = useParams();

  useEffect(() => {
    if (id) loadBook(id);
  }, [id, loadBook]);

  if (loadingInitial || !book) return <LoadingComponent />;

  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>{book.title}</Card.Header>
        <Card.Meta>
          <span>{book.author}</span>
        </Card.Meta>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths="2">
          <Button
            as={Link}
            to={`/manage/${book.id}`}
            basic
            color="blue"
            content="Edit"
          />
          <Button
            as={Link}
            to={"/books"}
            basic
            color="grey"
            content="Cancel"
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
});
