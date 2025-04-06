import { Tooltip, Chip, Button, Image } from "@nextui-org/react";
import React from "react";
import { FaEye, FaPencil, FaRegTrashCan } from "react-icons/fa6";

interface Props {
  item: any;
  columnKey: string | React.Key;
  onEdit: (id: any | Record<string, any>) => void;
  onDelete?: (id: any) => void;
  onView?: (id: any) => void;
}

export const RenderCell = ({ item, columnKey, onEdit, onDelete, onView }: Props) => {
  const handleEditClick = (row: any | Record<string, any>) => {
    return onEdit ? onEdit(row) : null;
  };
  const handleDeleteClick = (id: any) => {
    return onDelete ? onDelete(id) : null;
  };
  const handleViewClick = (id: any) => {
    return onView ? onView(id) : null;
  };
  // @ts-ignore
  const cellValue = item[columnKey];

  //una funcion devolver el boton de editar
  const btnEdit = () => {
    return (
      <Tooltip content="Editar" color="secondary">
        <Button
          onPress={() => handleEditClick(item)}
          isIconOnly
          color='secondary'
          variant='light'
          startContent={<FaPencil size={18}
            fill="#0482c1" />}
        />
      </Tooltip>

    );
  }
  //una funcion devolver el boton de eliminar
  const btnDelete = () => {
    return (
      <Tooltip
        content="Eliminar"
        color="danger"
      >
        <Button
          onPress={() => handleDeleteClick(item.id)}
          isIconOnly
          color='primary'
          variant='light'
          startContent={<FaRegTrashCan size={18}
            fill="#FF0080" />}
        />
      </Tooltip>

    );
  }
  //una funcion devolver el boton de ver
  const btnView = () => {
    return (
      <Tooltip content="Detalles">
        <Button
          onPress={() => handleViewClick(item.id)}
          isIconOnly
          color='primary'
          variant='light'
          startContent={<FaEye size={18}
            fill="#979797" />} />
      </Tooltip>
    );
  }

  /* Si la cadena contiene 'image' */
  if (columnKey.toString().includes('image') || columnKey.toString().includes('thumbnail') || columnKey.toString().includes('avatar') || columnKey.toString().includes('icon'))  {
    return (
      <Image className="responsive-image" src={cellValue? cellValue : 'https://placehold.co/60x60'} width={60} height={60} alt="Imagen" />
    );
  }
  /* Si la cadena contiene 'color' */
  if (columnKey.toString().includes('color'))  {
    return (
      <div className="w-fit" style={{ backgroundColor: cellValue }}>{cellValue}</div>
    );
  }

  switch (columnKey) {
    case "status":
      return (
        <Chip
          size="sm"
          variant="flat"
          color={
            cellValue === "activo"
              ? "success"
              : cellValue === "pendiente"
                ? "warning"
                : "danger"
          }
        >
          <span className="capitalize text-xs">{cellValue}</span>
        </Chip>
      );

    case "actions"://All acctions
      return (
        <div className="flex items-center gap-4 ">
          {btnView()}
          {btnEdit()}
          {btnDelete()}
        </div>
      );
    //Only show
    case "actions-s":
      return (
        <div className="flex items-center gap-4 ">

          {btnView()}
        </div>
      );
    //Only edit
    case "actions-e":
      return (
        <div className="flex items-center gap-4 ">

          {btnEdit()}
        </div>
      );
    //Only delete
    case "actions-d":
      return (
        <div className="flex items-center gap-4 ">

          {btnDelete()}
        </div>
      );
    //Only edit and delete
    case "actions-ed":
      return (
        <div className="flex items-center gap-4 ">
          {btnEdit()}
          {btnDelete()}
        </div>
      );
    //Only show and edit
    case "actions-se":
      return (
        <div className="flex items-center gap-4 ">
          {btnView()}
          {btnEdit()}
        </div>
      );
    //Only show and delete
    case "actions-sd":
      return (
        <div className="flex items-center gap-4 ">
          {btnView()}
          {btnDelete()}
        </div>
      );
    default:
      return cellValue;
  }
};
