import styled from "styled-components";
import propTypes from "prop-types";

import CreateCabinForm from "./CreateCabinForm";

import { useDeleteCabins } from "./useDeleteCabin";
import { formatCurrency } from "../../utils/helpers";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { useCreateCabin } from "./useCreateCabin";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Modal from "../../ui/Modal";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   padding: 1.4rem 2.4rem;

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;
function CabinRow({ cabin }) {
  const { isDeleting, deleteCabins } = useDeleteCabins();
  const { isCreating, createCabin } = useCreateCabin();

  const {
    name,
    regularPrice,
    maxCapacity,
    image,
    discount,
    id: CabinId,
  } = cabin;
  function handleDuplicate() {
    createCabin({
      name: `copy of ${name}`,
      regularPrice,
      maxCapacity,
      image,
      discount,
    });
  }
  return (
    <Table.Row>
      <Img src={image} alt={name} />
      <Cabin>{name}</Cabin>
      <div>Fits up to {maxCapacity} guests</div>
      <Price> {formatCurrency(regularPrice)}</Price>
      {discount ? (
        <Discount>{formatCurrency(discount)}%</Discount>
      ) : (
        <span>&mdash;</span>
      )}
      <div>
        <button onClick={handleDuplicate} disabled={isCreating}>
          <HiSquare2Stack />
        </button>
        <Modal>
          <Modal.open opens="edit">
            <button>
              {" "}
              <HiPencil />
            </button>
          </Modal.open>
          <Modal.window name="edit">
            <CreateCabinForm cabinToUpdate={cabin} />
          </Modal.window>
          <Modal.open opens="delete">
            <button disabled={isDeleting}>
              <HiTrash />
            </button>
          </Modal.open>
          <Modal.window name="delete">
            <ConfirmDelete
              resourceName="cabins"
              disabled={isDeleting}
              onConfirm={() => deleteCabins(CabinId)}
            />
          </Modal.window>
        </Modal>
        <Menus.Menu>
          <Menus.Toggle id={CabinId} />
          <Menus.List id={CabinId}>
            <Menus.Button icon={<HiSquare2Stack />}>Edit</Menus.Button>
            <Menus.Button icon={<HiPencil />} onClick={handleDuplicate}>
              Duplicate
            </Menus.Button>
            <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
          </Menus.List>
        </Menus.Menu>
      </div>
    </Table.Row>
  );
}

CabinRow.propTypes = {
  cabin: propTypes.object.isRequired,
};

export default CabinRow;
