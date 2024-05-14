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
  const [elementPosition, setElementPosition] = useState<OptionPositions | null>(null);
  const [options, setOptions] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  const getElementPosition = () => {
    if (elementRef.current) {
      const rect = elementRef.current.getBoundingClientRect();
      setElementPosition((prevPosition) => ({
        ...prevPosition,
        height: rect.height,
        left: rect.left,
        right: rect.right,
        top: rect.top,
        bottom: rect.bottom
      }));
    }
  };

  useEffect(() => {
    spliceText();
    getElementPosition();
  }, []);

  useEffect(() => {
    if (renderFullPost === undefined || renderFullPost === false) return;
    toggleText();
  }, [renderFullPost]);

  useEffect(() => {
    const handleResize = () => {
      getElementPosition();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleText = () => {
    if (showFullContent.textFull === '...mais') {
      setShowFullContent({ ...showFullContent, content, textFull: '' });
    }
  };

  const spliceText = () => {
    if (content.length < 600) {
      setShowFullContent({ ...showFullContent, content });
    } else {
      const novaString = content.slice(0, 600);
      setShowFullContent({ ...showFullContent, content: novaString });
    }
  };

  return { elementPosition, options, setOptions,elementRef ,showFullContent};
};
