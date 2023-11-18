const TextZone = ({ placeholder }: { placeholder: string }) => {
  return (
    <textarea
      className='p-3 w-full md:w-1/3 h-[300px] max-w-[800px] max-h-[800px] resize rounded-md bg-input_background border-solid border-2 border-input_border'
      placeholder={placeholder}
    />
  );
}

export default TextZone;