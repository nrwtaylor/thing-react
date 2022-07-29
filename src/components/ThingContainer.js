import React, { memo, useState, useEffect, useCallback } from "react";
import { Card } from "./Card.js";
import { Grid, Box } from "@material-ui/core";
import update from "immutability-helper";
import { useDrop } from "react-dnd";
import { ItemTypes } from "./ItemTypes";
import { FullscreenExitTwoTone } from "@material-ui/icons";
//import { wrap } from "analytics/lib/analytics.cjs";

const style = {
  //minHeight: 200,
  // maxWidth: 800,
  //width: '100%',
  //  display: 'flex',
  // spacing:'1'
 
};

export const ThingContainer = memo(function ThingContainer(props) {
  const [things, setThings] = useState(props.things);
  const findThing = useCallback(
    (id) => {
      const thing = things.filter((c) => `${c.index}` === id)[0];
      return {
        thing,
        index: things.indexOf(thing),
      };
    },
    [things]
  );

  const moveThing = useCallback(
    (id, atIndex) => {
      const { thing, index } = findThing(id);
      setThings(
        update(things, {
          $splice: [
            [index, 1],
            [atIndex, 0, thing],
          ],
        })
      );
    },
    [findThing, things, setThings]
  );

  const deleteThing = useCallback(
    (id, atIndex) => {
//console.log("deleteCard id", id);
//console.log("deleteCard atIndex", atIndex);
      const { thing, index } = findThing(id);

            setThings(update(things, {
                $splice: [[index,1]],
            }));
      props.onCollectionChange(things)
    },
    [things]
  );

  const openThing = useCallback(
    (id, atIndex) => {
//console.log("deleteCard id", id);
//console.log("deleteCard atIndex", atIndex);
      const { thing, index } = findThing(id);

 //           setThings(update(things, {
 //               $splice: [[index,1]],
 ///           }));
      props.onCollectionChange(things)
    },
    [things]
  );

  const flipThing = useCallback(
    (id, atIndex) => {
//console.log("deleteCard id", id);
//console.log("deleteCard atIndex", atIndex);
      const { thing, index } = findThing(id);

 //           setThings(update(things, {
 //               $splice: [[index,1]],
 ///           }));
      props.onCollectionChange(things)
    },
    [things]
  );

  useEffect(() => {
console.log('ThingContainer things', things);
    const reindexedThings = things.map((image, i) => {
      return { ...image, index: i };
    });
     props.onCollectionChange(reindexedThings);
  }, [things, setThings]);

  const [, drop] = useDrop(() => ({ accept: ItemTypes.CARD }));
  return (


    <div ref={drop} style={style} >
     
   
     <Grid container spacing={3} direction="row" >
    
    
{things && (<>
      {things.map((thing) => (
         <Card 
          key={thing.uuid}
          id={`${thing.index}`}
          card={thing}
          text={thing && thing.text}
          flipCard={flipThing}
          openCard={openThing}
          moveCard={moveThing}
          deleteCard={deleteThing}
          findCard={findThing}
        />
      ))}
     </>)}
       </Grid>
    

      </div>


    
   
  );
});

export default ThingContainer;
