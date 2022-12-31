import { Tr, Th, Checkbox, Box } from "@chakra-ui/react";

const FactoryItem = ({ checkedItems, setCheckedItems, index, ...props }) => {
  const { id, name, address } = props;

  const handleChecked = () => {
    checkedItems[index] = !checkedItems[index];
    setCheckedItems([...checkedItems]);
  };

  return (
    <Tr>
      <Th>
        <Checkbox isChecked={checkedItems[index]} onChange={handleChecked} />
      </Th>
      <Th>
        <Box whiteSpace={"normal"}>{id}</Box>
      </Th>
      <Th>
        <Box whiteSpace={"normal"}>{name}</Box>
      </Th>
      <Th>
        <Box whiteSpace={"normal"}>{address}</Box>
      </Th>
    </Tr>
  );
};

export default FactoryItem;
