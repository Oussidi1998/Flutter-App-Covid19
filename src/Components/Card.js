import React from "react";
import { Card, CardContent} from "@material-ui/core";


function OurCard(props) {
  return (
    <Card>
      <CardContent>
        <h1>{props.number}</h1>
        <h4>{props.text}</h4>
      </CardContent>
    </Card>
  );
}


export default OurCard;
