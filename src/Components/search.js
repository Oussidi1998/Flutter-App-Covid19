import React from "react";
import { Autocomplete } from "@material-ui/lab";
import { TextField} from "@material-ui/core";
import listCountries from "./../Countries.json";

function Search(props) {
    const InputChanged = (e,value)=>{props.SearchCallback(value.name);console.log(value);
    };
  return (
    <Autocomplete
      id="combo-box-demo"
      options={listCountries}
      getOptionLabel={option => option.name}
      style={{ width: 300 }}
      onChange={InputChanged}
      renderInput={params => (
        <TextField {...params} label="Choose your country" variant="outlined" />
      )}
    />
  );
}

export default Search;
