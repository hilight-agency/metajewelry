import * as React from "react";

import Lightbox from "yet-another-react-lightbox";
import Inline from "yet-another-react-lightbox/plugins/inline";

export default function Carousel({slides}) {
  /* const [open, setOpen] = React.useState(false); */
  const [index, setIndex] = React.useState(0);

  /* const toggleOpen = (state) => () => setOpen(state); */

  const updateIndex = ({ index: current }) =>
    setIndex(current);
  return (
    <>
      <Lightbox
        index={index}
        slides={slides}
        plugins={[Inline]}
        on={{
          view: updateIndex,
        }}
        carousel={{
          padding: 0,
          spacing: 0,
        }}
        inline={{
          style: {        
            maxWidth: "100vw",    
            aspectRatio: "1 / 1",
            margin: "0 auto",
          },
        }}
      />
    </>
  );
}
