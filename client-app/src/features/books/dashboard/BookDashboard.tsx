import { Grid } from "semantic-ui-react";
import BookList from "./BookList";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import LoadingComponent from "../../../app/layout/LoadingComponent";

export default observer(function BookDashboard() {
  const { bookStore } = useStore();
  const { loadBooks, bookRegistry } = bookStore;

  useEffect(() => {
    if (bookRegistry.size <= 1) loadBooks();
  }, [loadBooks]);

  if (bookStore.loadingInitial)
    return <LoadingComponent content="Loading books" />;

  return (
    <Grid>
      <Grid.Column width="15">
        <BookList />
      </Grid.Column>
    </Grid>
  );
});
