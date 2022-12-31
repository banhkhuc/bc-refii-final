import { FactoryStore } from "./factoryStore";
import { GuaranteeStore } from "./guaranteeStore";
import { UserStore } from "./userStore";

export const Stores = ({ children }) => {
  return (
    <UserStore>
      <GuaranteeStore>
        <FactoryStore>{children}</FactoryStore>
      </GuaranteeStore>
    </UserStore>
  );
};

export { FactoryContext } from "./factoryStore";
export { GuaranteeContext } from "./guaranteeStore";
export { UserContext } from "./userStore";
