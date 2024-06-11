import { useEffect, useRef, useState } from "react";

type ContentPost = {
  content: string;
  textFull: '...mais' | '';
};

type OptionPositions = {
  height: number;
  left: number;
  right: number;
  top: number;
  bottom: number;
};

export const usePostCustom = (content: string,renderFullPost?: boolean) => {
  const [showFullContent, setShowFullContent] = useState<ContentPost>({
    content: '',
    textFull: '...mais'
  });
  //const [elementPosition, setElementPosition] = useState<OptionPositions | null>(null);
  const [options, setOptions] = useState(false);
  const optionsRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
    spliceText();
    const handleOutsideClick = (event: MouseEvent) => {
      if (optionsRef.current && !optionsRef.current.contains(event.target as Node)) {
        setOptions(false)
      }
    };
  
    // Adicionando o evento de clique no DOM
    document.addEventListener('mousedown', handleOutsideClick);
  
    // Removendo o evento de clique no DOM quando o componente é desmontado
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
   
  }, []);


  

  const spliceText = () => {
    if (content.length < 600) {
      setShowFullContent({ ...showFullContent, content });
    } else {
      const novaString = content.slice(0, 600);
      setShowFullContent({ ...showFullContent, content: novaString });
    }
  };

  return {  options, setOptions,optionsRef,showFullContent};
};
