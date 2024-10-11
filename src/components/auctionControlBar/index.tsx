import { useDyteMeeting } from "@dytesdk/react-web-core";
import React from "react";
import CurrencyInput from "react-currency-input-field";
import { formatBid } from "../../utils";
import Button from "../button";
import Icon from "../icon/Icon";
import Counter from "../numberCounter";

type Bid = {
  bid: number;
  user: string;
};

type Props = {
  isHost: boolean;
  item: number;
  highestBid: Bid;
  handlePrev: () => void;
  handleNext: () => void;
};

const AuctionControlBar: React.FC<Props> = (props) => {
  const { meeting } = useDyteMeeting();
  const { isHost, item, highestBid, handleNext, handlePrev } = props;
  const [bid, setBid] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);

  const validateBid = (value: string) => {
    if (value === "") {
      setError(null); // Clear error if input is empty
    } else if (!isNaN(+value) && +value > highestBid.bid) {
      setError(null); // Valid bid, clear error
    } else {
      setError("Bid must be higher than the highest bid."); // Invalid bid, show error
    }
  };

  const placeBid = () => {
    if (!isNaN(+bid) && +bid > highestBid.bid) {
      meeting.participants.broadcastMessage("new-bid", {
        bid: +bid,
        user: meeting.self.name,
      });

      setError(null);
      setTimeout(() => {
        setBid("");
      }, 0);
    } else {
      setError("Bid must be higher than the highest bid.");
    }
  };

  const handleChange = (value: string | undefined) => {
    setBid(value || "");
    validateBid(value || "");
  };

  return (
    <div className="flex flex-col p-2 bg-gray-200 w-full gap-2">
      <div className="flex justify-between text-gray-900">
        <span className="font-medium text-lg">
          {highestBid.user === "default" ? "Starting" : "Highest"} Bid:
        </span>
        <Counter
          direction="up"
          format={formatBid}
          targetValue={highestBid.bid}
        />
      </div>

      {isHost && (
        <div className="flex">
          <div className="flex-grow"></div>
          <div className="flex items-center bg-gray-300 rounded-lg border border-gray-200 overflow-hidden">
            <button
              onClick={handlePrev}
              className="p-2 transition-transform duration-200 hover:scale-110 focus:outline-none"
            >
              <Icon size="sm" icon="prev" />
            </button>
            <span className="mx-2 text-gray-700">{item + 1}</span>
            <button
              onClick={handleNext}
              className="p-2 transition-transform duration-200 hover:scale-110 focus:outline-none"
            >
              <Icon size="sm" icon="next" />
            </button>
          </div>
        </div>
      )}

      {!isHost && (
        <>
          <div className="flex items-center gap-2">
            <CurrencyInput
              className="flex-grow border border-gray-300 rounded-lg py-2.5 px-4 text-gray-900 placeholder-gray-500 bg-white transition-colors duration-300 ease-in-out focus:outline-none focus:border-[#9e77e0]"
              placeholder="Enter bid (e.g. $1,000.00)"
              decimalsLimit={2}
              prefix="$"
              value={bid}
              onValueChange={handleChange}
            />
            <Button onClick={placeBid}>Your Bid</Button>
          </div>

          <div className="h-5">
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
        </>
      )}
    </div>
  );
};

export default AuctionControlBar;
