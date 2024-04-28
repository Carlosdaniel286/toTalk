import { useEffect, useRef, useState } from "react";

export const useCostumResize =()=>{
 const  [dimensions, setDimensions] = useState({
    height:0,
    width:0,
  });
 
  const elementRef = useRef<HTMLDivElement>(null);
  // Crie um estado para armazenar as dimensões
  const [refDimensions, setRefDimensions] = useState({ width: 0, height: 0 });

  // Use o useEffect para obter as dimensões após o componente ser montado
  useEffect(() => {
    const updateDimensions = () => {
      if (elementRef.current) {
        const { offsetWidth, offsetHeight } = elementRef.current;
        setRefDimensions({...refDimensions, width: offsetWidth, height: offsetHeight });
      }
    };

    // Atualize as dimensões quando o componente for montado
    updateDimensions();

    // Adicione um listener de redimensionamento para atualizar as dimensões quando a janela for redimensionada
    window.addEventListener('resize', updateDimensions);

    // Remova o listener de redimensionamento ao desmontar o componente
    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);
  
  
  
  useEffect(() => {
    function handleResize() {
    if(typeof window ==='undefined') return
     setDimensions({
        ...dimensions,height:window.innerHeight,
        width:window.innerWidth
     })
    }

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return{dimensions,elementRef,refDimensions}
 
}