import { useEffect, useRef, useState } from "react";
import Modal from "react-responsive-modal";
import ReactTags from "react-tag-autocomplete";
import { getFilterInviteMemberApi } from "../../Api/user";
import toast from "toastr";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../pages/redux/user";

const InviteMember = ({
  openInviteMember,
  handleCloseInviteMember,
  loader,
  setSelectedMemberList,
  errors,
  setErrors,
  selectedMemberList,
  setMemberId,
  memberId,
}) => {
  toast.options = { preventDuplicates: true };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user.user);

  const ref = useRef();
  const [suggetions, setSuggetions] = useState([]);
  const handleSubmit = (e, value) => {
    e.preventDefault();
    if (isValid()) {
      handleCloseInviteMember();
      setErrors(null);
      if (memberId.length == 0) {
        setMemberId([userData._id]);
      }
    }
  };

  useEffect(() => {
    getSuggetions();
  }, []);

  const getSuggetions = async () => {
    const res = await getFilterInviteMemberApi("", "active", "", "message");
    if (res?.data?.code === 200) {
      const data = res.data.data.map((val) => {
        const obj = {
          name: val.email,
          id: val._id,
        };
        return obj;
      });

      setSuggetions(data);
    } else if (res?.data?.code === 401) {
      toast.error("Session has been expired!");
      localStorage.clear();
      dispatch(login({}));
      navigate("/login");
    } else {
      toast.error(res.data.message);
    }
  };

  const onAddition = (tag) => {
    if (selectedMemberList.find((item) => item.id == tag.id)) {
      const newArray = selectedMemberList.filter((e) => e.id !== tag.id);
      setSelectedMemberList(newArray);
    } else {
      const tags = [...selectedMemberList, tag];
      setSelectedMemberList(tags);
    }
    if (memberId.includes(tag.id)) {
      const newArray = memberId.filter((e) => e != tag.id);
      setMemberId(newArray);
    } else {
      const tagId = [...memberId, tag.id];
      setMemberId(tagId);
    }

    setErrors(null);
  };
  const handleDelete = (i) => {
    const lists = selectedMemberList.filter((_, index) => index !== i);
    setSelectedMemberList(lists);
    const newTags1 = memberId.slice(0);
    newTags1.splice(i, 1);
    setMemberId(newTags1);
  };

  const isValid = () => {
    let formData = true;
    switch (true) {
      case selectedMemberList.length == 0:
        setErrors({ selectedMemberList: "Field is required!" });
        formData = false;
        break;

      default:
        formData = true;
    }
    return formData;
  };

  return (
    <div className="block">
      <Modal
        open={openInviteMember}
        onClose={handleCloseInviteMember}
        classNames={{
          modal: "modal-medium",
          overlay: "modal-full-height",
        }}
      >
        <div className="py-4 px-5">
          <h1 className="text-xl text-dark tracking-[-.03em] font-bold pb-5 font-Karla">
            Invite New Member
          </h1>
          <form
            className="my-4"
            onSubmit={
              !loader ? handleSubmit : (event) => event.preventDefault()
            }
          >
            <div className="d-block mb-2 relative">
              <label
                htmlFor="memberName"
                className="text-base font-bold font-Karla text-light-dark mb-1 block"
              >
                Member
              </label>
              {/* <TagsInput
                    value={selectedMemberList}
                    onChange={setSelectedMemberList}
                    name="memberName"
                    placeHolder="Enter name"
                /> */}
              <ReactTags
                ref={ref}
                suggestions={suggetions}
                allowNew
                tags={selectedMemberList}
                onAddition={onAddition}
                removeButtonText="X"
                onDelete={handleDelete}
                placeholderText="Invite members"
                minQueryLength={1}
              />
              <span className="form-error text-error text-sm font-normal">
                {errors && errors.selectedMemberList}
              </span>
            </div>
            <div className="flex justify-start mb-2 mt-8">
              <button
                type="submit"
                className="rounded-md font-bold flex items-center tracking-[-.03em] min-w-[152px] justify-center text-lg bg-primary text-white py-4 px-6 font-Karla"
              >
                {loader ? (
                  <>
                    <box-icon
                      name="loader-circle"
                      class="fill-white mr-2"
                      animation="spin"
                    ></box-icon>{" "}
                    Submit
                  </>
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default InviteMember;
