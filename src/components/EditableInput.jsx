import React, { useCallback, useState } from "react";
import { Alert, Icon, Input, InputGroup } from "rsuite";

function EditableInput({
  initialValue,
  handleSave,
  label = null,
  placeholder = "Write your Nickname",
  emptyMsg = "Input is empty",
  ...inputProps
}) {
  const [input, setInput] = useState(initialValue);
  const [editName, setEditName] = useState(false);

  const handleNameChange = useCallback((value) => {
    setInput(value);
  }, []);

  const handleEditName = useCallback(() => {
    setEditName((p) => !p);
    setInput(initialValue);
  }, [initialValue]);

  const handleSaveName = () => {
    const trimmed = input.trim();

    if (trimmed === "") {
      Alert.info(emptyMsg, 4000);
    }

    if (trimmed !== initialValue) {
      handleSave(trimmed);
    }

    setEditName(false);
  };

  return (
    <div>
      {label}
      <InputGroup>
        <Input
          {...inputProps}
          disabled={!editName}
          placeholder={placeholder}
          value={input}
          onChange={handleNameChange}
        />
        <InputGroup.Button onClick={handleEditName}>
          <Icon icon={editName ? "close" : "edit2"} />
        </InputGroup.Button>

        {editName && (
          <InputGroup.Button onClick={handleSaveName}>
            <Icon icon="check" />
          </InputGroup.Button>
        )}
      </InputGroup>
    </div>
  );
}

export default EditableInput;
