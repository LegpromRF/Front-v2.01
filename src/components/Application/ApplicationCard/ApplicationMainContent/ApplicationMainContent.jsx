import ApplicationStats from "../ApplicationStats/ApplicationStats";
import MainCharacteristics from "../MainCharacteristics/MainCharacteristics";
import UnavailableСontacts from "../UnavailableСontacts/UnavailableСontacts";

const ApplicationMainContent = () => {
  return (
    <div>
      <ApplicationStats />

      <MainCharacteristics />

      <UnavailableСontacts style={{ marginTop: "22px" }} />
    </div>
  );
};

export default ApplicationMainContent;
