import { useEffect, useState } from "react";
import { useDyteMeeting } from "@dytesdk/react-web-core";
import {
  DyteAudioVisualizer,
  DyteAvatar,
  DyteCameraToggle,
  DyteMicToggle,
  DyteNameTag,
  DyteParticipantTile,
} from "@dytesdk/react-ui-kit";
import Button from "../../components/button";

const SetupScreen = () => {
  const { meeting } = useDyteMeeting();
  const [isHost, setIsHost] = useState<boolean>(false);
  const [name, setName] = useState<string>("");

  useEffect(() => {
    if (!meeting) return;
    const preset = meeting.self.presetName;
    const name = meeting.self.name;
    setName(name);

    if (preset.includes("host")) {
      setIsHost(true);
    }
  }, [meeting]);

  const joinMeeting = () => {
    meeting?.self.setName(name);
    meeting.joinRoom();
  };

  return (
    <div className="h-screen w-screen flex flex-row items-center justify-between sm:flex-col sm:justify-center sm:items-center">
      <div className="w-1/2 sm:w-full flex items-center justify-center">
        <div className="relative">
          <DyteParticipantTile meeting={meeting} participant={meeting.self}>
            <DyteAvatar size="md" participant={meeting.self} />
            <DyteNameTag meeting={meeting} participant={meeting.self}>
              <DyteAudioVisualizer
                size="sm"
                slot="start"
                participant={meeting.self}
              />
            </DyteNameTag>
            <div className="absolute bottom-2 right-2 flex">
              <DyteMicToggle size="sm" meeting={meeting} />
              &ensp;
              <DyteCameraToggle size="sm" meeting={meeting} />
            </div>
          </DyteParticipantTile>
        </div>
      </div>
      <div className="flex flex-col w-1/2 p-8 sm:w-full sm:max-w-sm text-center">
        <h2 className="my-2 font-medium">Welcome! {name}</h2>
        <p className="my-2 text-gray-700">
          {isHost ? "You are joining as a Host" : "You are joining as a bidder"}
        </p>
        <input
          disabled={!meeting.self.permissions.canEditDisplayName ?? false}
          className="flex-grow border mb-2.5 border-gray-300 rounded-lg py-2.5 px-4 text-gray-900 placeholder-gray-500 bg-white transition-colors duration-300 ease-in-out focus:outline-none focus:border-[#9e77e0] focus:ring-2 focus:ring-[#9e77e0] focus:ring-opacity-50"
          style={{ transition: "box-shadow 0.3s ease-in-out" }}
          onFocus={(e) =>
            (e.currentTarget.style.boxShadow =
              "0 0 5px rgba(59, 130, 246, 0.5)")
          }
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button onClick={joinMeeting}>Join Meeting</Button>
      </div>
    </div>
  );
};

export default SetupScreen;
