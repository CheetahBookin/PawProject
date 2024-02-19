interface LabelCheckboxProps {
  content: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  important?: boolean;
  name: string;
  terms?: boolean;
}

function LabelCheckbox({ content, onChange, important, name, terms = false }: LabelCheckboxProps) {
  return (
    <label>
      <input type='checkbox' onChange={onChange} name={name} />
      <span className={important ? 'text-gray-700 pl-1' : 'text-sm text-gray-700 pl-1'}>
        {!terms ? content : (
          <span>
            I agree to the{' '}
            <a
              href="/assets/CheetahBooking_TermsAndConditions.pdf"
              download="CheetahBooking_TermsAndConditions.pdf"
              className="hover:text-gray-500 transition-all underline"
            >
              terms and conditions
            </a>
          </span>
        )}
      </span>
    </label>
  );
}

export default LabelCheckbox;
