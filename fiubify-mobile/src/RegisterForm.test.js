import RegisterForm from "../components/login/RegisterForm";
import {render} from "@testing-library/react-native"

describe("RegisterForm", () => {
  it('must have a user or email input', () => {
    const { getByPlaceholderText } = render(
      <RegisterForm />
    );

    const elementForInputEmail = getByPlaceholderText("Username", {exact: false})
    expect(elementForInputEmail).not.toBeNull()
  })

  it('must have a register button', () => {
    const { getByText } = render(
      <RegisterForm />
    );

    const registerButton = getByText("REGISTER", {exact: false})
    expect(registerButton).not.toBeNull()
  })

  it('must have a role to select', () => {
    const { getByText } = render(
      <RegisterForm />
    )

    const roleSelector = getByText("Select", {exact: false})
  })
})
