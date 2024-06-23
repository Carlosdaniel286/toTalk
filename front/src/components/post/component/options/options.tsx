// Importando ícones do Material UI
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ModeEditOutlineSharpIcon from '@mui/icons-material/ModeEditOutlineSharp';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import { P } from '@/components/p/p';
import { CSSProperties } from 'react';

type OptionsProps = {
  onClickDelete?: () => void;
  onClickEdit?: () => void;
  onClosed?: () => void;
  styles?: CSSProperties;
};

// Componente Options que recebe várias props definidas pelo tipo OptionsProps
export const Options = ({ onClickDelete, onClosed, styles ,onClickEdit}: OptionsProps) => {
  // Função de clique, utiliza a prop onClick se fornecida, caso contrário, usa uma função vazia
  const handleClick = onClickDelete || (() => {});
  const handleClickEdit =onClickEdit || (() => {});
  // Função de fechamento, utiliza a prop onClosed se fornecida, caso contrário, usa uma função vazia
  const handleClose = onClosed || (() => {});

  return (
    <div
      style={{
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        minHeight: '100px',
        width: '100%',
        borderRadius: "10px",
        background: 'white',
        display: 'flex',
        flexDirection: 'column',
        padding: '8px',
        boxSizing: 'border-box',
        ...styles // Estilos adicionais passados como prop
      }}
    >
      <div style={{ display: 'flex' }}>
        {/* Botão de fechar */}
        <P
          style={{ fontSize: '1.2rem', cursor: 'pointer' }}
          onClick={handleClose}
        >
          X
        </P>
      </div>
      <List aria-labelledby="decorated-list-demo">
        {/* Item de lista para excluir */}
        <ListItem>
          <ListItemDecorator>
            <DeleteForeverIcon color='error' />
          </ListItemDecorator>
          <P
            style={{ cursor: 'pointer', color: "red" }}
            onClick={handleClick}
          >
            Excluir
          </P>
        </ListItem>
        {/* Item de lista para editar */}
        <ListItem>
          <ListItemDecorator>
            <ModeEditOutlineSharpIcon />
          </ListItemDecorator>
          <P
            style={{ cursor: 'pointer', color: 'black' }}
            onClick={handleClickEdit}
          >
            Editar
          </P>
        </ListItem>
      </List>
    </div>
  );
};
