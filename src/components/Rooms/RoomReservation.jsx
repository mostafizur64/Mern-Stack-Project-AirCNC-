import React, { useContext, useState } from "react";
import Calender from "./Calender";
import Button from "../Button/Button";
import { AuthContext } from "../../providers/AuthProvider";
import BookingModal from "../Modal/BookingModal";
import { formatDistance } from "date-fns";
import { addBooking, updateStatus } from "../../api/Booking";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const RoomReservation = ({ roomData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { role, user } = useContext(AuthContext);
  const navigate = useNavigate();
  // close modal
  const closeModal = () => {
    setIsOpen(false);
  };
  // price calculation
  const totalPrice =
    parseFloat(
      formatDistance(new Date(roomData.to), new Date(roomData.from)).split(
        " "
      )[0]
    ) * roomData.price;

  const [value, setValue] = useState({
    startDate: new Date(roomData?.from),
    endDate: new Date(roomData?.to),
    key: "selection",
  });

  // booking state
  const [bookingInfo, setBookingInfo] = useState({
    guest: { name: user.displayName, email: user.email, image: user.photoURL },
    host: roomData.host.email,
    location: roomData.location,
    price: totalPrice,
    to: value.endDate,
    from: value.startDate,
    title: roomData.title,
    total_guest: roomData.total_guest,
    roomId: roomData._id,
    image: roomData.image,
  });
  console.log(bookingInfo);

  // handleSelection fucntion
  const handleSelect = (ranges) => {
    setValue({ ...value });
  };
  const modalHandler = () => {
    addBooking(bookingInfo)
      .then((data) => {
        console.log(data);
        updateStatus(roomData._id, true).then((data) => {
          console.log(data);
          toast.success("booking successful!");
          navigate("/dashboard/my-bookings");
          closeModal();
        });
      })
      .catch((err) => console.log(err.message));
    console.log(bookingInfo);
  };
  return (
    <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden ">
      <div className="flex flex-row items-center gap-1 p-4">
        <div className="text-2xl font-extrabold ">${roomData.price}</div>
        <div className="font-light text-neutral-600 ">night</div>
      </div>
      <hr />
      <div className="flex justify-center items-center">
        <Calender value={value} handleSelect={handleSelect} />
      </div>
      <hr />
      <div className="p-4">
        <Button
          onClick={() => setIsOpen(true)}
          disabled={
            `roomData?.host?.email ` === `user?.email` || `roomData.booked`
          }
          label="Reserve"
        />
      </div>
      <hr />
      <div className="p-4 flex flex-row items-center justify-between font-semibold text-lg">
        <div>Total</div>
        <div>${totalPrice}</div>
      </div>
      <BookingModal
        modalHandler={modalHandler}
        bookingInfo={bookingInfo}
        isOpen={isOpen}
        closeModal={closeModal}
      />
    </div>
  );
};

export default RoomReservation;
