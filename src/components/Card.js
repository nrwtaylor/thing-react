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

export const Card =  memo(function Card({
  id,
  card,
  token,
  text,
  flipCard,
  spawnCard,
  openCard,
  foldCard,
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
    if (e === "spawn") {
      spawnCard(id, originalIndex);
    }

    if (e === "forget") {
      deleteCard(id);
    }

    if (e === "open") {
      openCard(id);
    }

    if (e === "flip") {
      flipCard(id);
    }

    if (e === "fold") {
      foldCard(id);
    }

  }
  function handleOpenCard(e) {
    //    props.onCardChange(e);
    openCard(id);
  }

  function handleFlipCard(e) {
    //    props.onCardChange(e);
    flipCard(id);
  }

  function handleFoldCard(e) {
    foldCard(id);
  }


  function handleDelete() {
    //console.log("Saw delete index", id)
    deleteCard(id);
  }

  useEffect(() => {
    console.log("Card card", card);
  }, [card]);

  if (card && card.open && card.open === "open") {
    return (
      <Grid
        item
        xs={12}
        sm={12}
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
            //          to={card.to}
            //          subject={card.subject}
            //          createdAt={card.createdAt}
            //priorUuid={datagram.uuid}
            uuid={card.uuid}
            //          input={card.input}
            token={token}
            datagram={card}
            webPrefix={card.webPrefix}
            onChange={(e) => handleChange(e)}
          />
        </Box>
      </Grid>
    );
  }

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
          //          to={card.to}
          //          subject={card.subject}
          //          createdAt={card.createdAt}
          uuid={card.uuid}
          //          input={card.input}
          token={token}
          datagram={card}
          webPrefix={card.webPrefix}
          onChange={(e) => handleChange(e)}
        />
      </Box>
    </Grid>
  );
});
