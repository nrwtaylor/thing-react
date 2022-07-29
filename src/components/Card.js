import React, { memo, useEffect } from "react";
import { useDrag, useDrop } from "react-dnd";
import { ItemTypes } from "./ItemTypes";
//import { Thing } from "./../components/Thing.js";
import Thing from "./../../src/components/Thing.js";

//import FirebaseStorageImage from "./../components/FirebaseStorageImage";
import { Grid, Box } from "@material-ui/core/";
//import arrow from "./../images/arrow.svg";

const style = {
  // boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
  // marginRight: '1rem',
  // backgroundColor: 'white',
  //  cursor: 'move',
  // display: 'flex',
  // alignSelf: 'flex-end',
  // textAlign: 'right',
  // height:'100%'
};

export const Card = memo(function Card({
  id,
  card,
  text,
flipCard,
openCard,
  moveCard,
  deleteCard,
  findCard,
}) {
  const originalIndex = findCard(id).index; //index
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.CARD,
      item: { id, originalIndex },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      end: (item, monitor) => {
        const { id: droppedId, originalIndex } = item;
        const didDrop = monitor.didDrop();
        if (!didDrop) {
          moveCard(droppedId, originalIndex);
        }
      },
    }),
    [id, originalIndex, moveCard]
  );
  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.CARD,
      canDrop: () => false,
      hover({ id: draggedId }) {
        if (draggedId !== id) {
          const { index: overIndex } = findCard(id);
          moveCard(draggedId, overIndex);
        }
      },
    }),
    [findCard, moveCard]
  );
  const opacity = isDragging ? 0 : 1;

  function handleFlipCard(e) {

//    props.onCardChange(e);
flipCard(id);
  }
function handleChange(e) {
console.log("handleChange", e);
}
  function handleOpenCard(e) {

//    props.onCardChange(e);
openCard(id);
  }


  function handleDelete() {
    //console.log("Saw delete index", id)
    deleteCard(id);
  }

  useEffect(() => {
    console.log("Card card", card);
  }, [card]);

  return (
    <Grid
      item
      xs={12}
      sm={3}
      ref={(node) => drag(drop(node))}
      style={{ ...style, opacity }}
    >
      <Box
        style={{
          border: "1px solid #1d7d1d",
          borderRadius: "8px",
          padding: "4px",
          height: "100%",
          display: "flex",
          cursor: "move",
        }}
      >
        <Thing
          to={card.to}
          subject={card.subject}
          createdAt={card.createdAt}
          uuid={card.uuid}
          input={card.input}
          webPrefix={card.webPrefix}
          onChange={(e)=>handleChange(e)}
        />
      </Box>
    </Grid>
  );
});
