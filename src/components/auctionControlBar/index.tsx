import { useDyteMeeting } from "@dytesdk/react-web-core";
import React, { useCallback } from "react";
import { useCurrencyInput } from "../../hooks/useCurrency";
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
  const {
    value: bid,
    onChange: handleBidChange,
    onBlur: handleBidBlur,
    ref: bidInputRef,
    clearInput,
  } = useCurrencyInput("");

  const [error, setError] = React.useState<string | null>(null);

  const placeBid = useCallback(() => {
    const numericBid = parseFloat(bid.replace(/[^0-9.]/g, ""));
    if (!isNaN(numericBid) && numericBid > highestBid.bid) {
      meeting.participants.broadcastMessage("new-bid", {
        bid: numericBid,
        user: meeting.self.name,
      });

      setError(null);
      setTimeout(() => {
        clearInput();
      }, 0);
    } else {
      setError("Bid must be higher than the highest bid.");
    }
  }, [bid, meeting, highestBid, clearInput]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleBidChange(e);
    const numericBid = parseFloat(e.target.value.replace(/[^0-9.]/g, ""));
    if (numericBid <= highestBid.bid) {
      setError("Your bid must be higher than the highest bid.");
    } else {
      setError(null);
    }
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
            <input
              ref={bidInputRef}
              onChange={handleChange}
              onBlur={handleBidBlur}
              placeholder="Enter bid (e.g. $1,000.00)"
              value={bid}
              type="text"
              inputMode="decimal"
              className="flex-grow border border-gray-300 rounded-lg py-2.5 px-4 text-gray-900 placeholder-gray-500 bg-white transition-colors duration-300 ease-in-out focus:outline-none focus:border-[#9e77e0] focus:ring-2 focus:ring-[#9e77e0] focus:ring-opacity-50"
              style={{
                transition: "box-shadow 0.3s ease-in-out",
              }}
              onFocus={(e) =>
                (e.currentTarget.style.boxShadow =
                  "0 0 5px rgba(59, 130, 246, 0.5)")
              }
            />

            <Button
              disabled={
                parseFloat(bid.replace(/[^0-9.]/g, "")) <= highestBid.bid ||
                bid === ""
              }
              onClick={placeBid}
            >
              Your Bid
            </Button>
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
