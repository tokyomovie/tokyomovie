import { useSignal, useSignalEffect } from "@preact/signals";
import { SelectProps } from "../../components/Select.tsx";
import Button from "../Button.tsx";
import SelectField from "../form/SelectField.tsx";
import InputField from "../form/InputField.tsx";
import CheckboxField from "../form/CheckboxField.tsx";
import Stars from "../stars/Stars.tsx";
import Divider from "../../components/Divider.tsx";
import Info from "../../components/Info.tsx";
import ControlledInfo from "../../components/ControlledInfo.tsx";
import Close from "../../components/icons/Close.tsx";
import Check from "../../components/icons/Check.tsx";
import Notification from "../../components/icons/Notification.tsx";
import Important from "../../components/icons/Important.tsx";
import StarIcon from "../../components/icons/StarIcon.tsx";
import Add from "../../components/icons/Add.tsx";
import Cog from "../../components/icons/Cog.tsx";
import Dots from "../../components/icons/Dots.tsx";
import Link from "../../components/icons/Link.tsx";
import Menu from "../../components/icons/Menu.tsx";
import LocationPin from "../../components/icons/LocationPin.tsx";
import Videocam from "../../components/icons/Videocam.tsx";
import UserCircle from "../../components/icons/UserCircle.tsx";
import UserGroup from "../../components/icons/UserGroup.tsx";

const EXAMPLE_FORM_ID = "example-form";

const exampleSelectData: SelectProps = {
  name: "example-select",
  invalid: false,
  disabled: false,
  options: [
    { value: "option-one", label: "Option One" },
    { value: "option-two", label: "Option Two" },
    { value: "option-three", label: "Option Three" },
  ],
};

export default function FormIsland() {
  const invalid = useSignal(false);
  const showStars = useSignal(false);
  const showInfo = useSignal(true);

  useSignalEffect(() => {
    showStars.value = false;
  });
  return (
    <form
      className="max-w-lg m-8"
      id={EXAMPLE_FORM_ID}
      onSubmit={(event) => {
        event.preventDefault();
        const formEl = event.target as HTMLFormElement;
        const data = new FormData(formEl);
        console.log(data.get("example-select"));
        console.log(data.get("example-input"));
        console.log(data.get("example-check") === "on");
      }}
    >
      <SelectField
        name="example-select"
        label="example select"
        helperText="this text helps"
        error="somethings wrong"
        required
        options={exampleSelectData.options}
      />
      <InputField
        name="example-input"
        label="example input"
        helperText="this helps a lot"
        error="no good son"
        required
      />
      <CheckboxField
        labelText="example check"
        name="example-check"
        helperText="this text also helps"
        error="sorry you cant check it"
        required
      />
      <Button
        onClick={() => {
          console.log("button clicked");
          // invalid.value = !invalid.value
        }}
        type="submit"
      >
        button
      </Button>
      <Divider />
      <p class="text-success">this was a successful action you took!</p>
      <Divider />
      <Button
        fullWidth
        onClick={() => {
          showStars.value = true;
          setTimeout(() => {
            showStars.value = false;
          }, 1000);
        }}
      >
        be a star
      </Button>
      <Divider />
      <Button
        fullWidth
        inverse
        onClick={() => {
          showStars.value = true;
          setTimeout(() => {
            showStars.value = false;
          }, 1000);
        }}
      >
        be an inverse star
      </Button>
      {showStars.value && <Stars scatterHang />}
      <Stars scatterHang />
      <Divider />
      <Info type="info" message="info text goes here" />
      <Divider />
      <Info type="success" message="success text goes here" />
      <Divider />
      <Info type="error" message="error text goes here" />
      <Divider />
      <ControlledInfo
        type="info"
        message="this is a controlled info message"
        show={showInfo.value}
        onClose={() => (showInfo.value = false)}
      />
      <Divider />
      <ControlledInfo
        type="success"
        message="this is a controlled success message"
        show={showInfo.value}
        onClose={() => (showInfo.value = false)}
      />
      <Divider />
      <ControlledInfo
        type="error"
        message="this is a controlled error message"
        show={showInfo.value}
        onClose={() => (showInfo.value = false)}
      />
      <Divider />
      <div class="flex flex-wrap gap-2">
        <Divider />
        <Check />
        <Close />
        <Important />
        <Notification />
        <StarIcon />
        <Add />
        <Cog />
        <Dots />
        <Link />
        <Menu />
        <LocationPin />
        <Videocam />
        <UserCircle />
        <UserGroup />
      </div>

      <Divider />
    </form>
  );
}
