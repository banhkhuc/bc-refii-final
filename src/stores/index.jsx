import { FactoryStore } from "./factoryStore";
import { GuaranteeStore } from "./guaranteeStore";
import { ReportStore } from "./reportStore";
import { UserStore } from "./userStore";

export const Stores = ({ children }) => {
  return (
    <UserStore>
      <ReportStore>
        <GuaranteeStore>
          <FactoryStore>{children}</FactoryStore>
        </GuaranteeStore>
      </ReportStore>
    </UserStore>
  );
};

export { FactoryContext } from "./factoryStore";
export { GuaranteeContext } from "./guaranteeStore";
export { ReportContext } from "./reportStore";
export { UserContext } from "./userStore";
