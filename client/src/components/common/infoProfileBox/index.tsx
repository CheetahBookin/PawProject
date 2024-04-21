import { Url } from 'next/dist/shared/lib/router/router';
import Link from 'next/link';
import React from 'react';

type InfoProfileBoxProps = {
    text: string;
    children: React.ReactNode;
}

function InfoProfileBox({ text, children }: InfoProfileBoxProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 text-center h-1/3 w-2/5">
        <h1>{text}</h1>
        {children}
    </div>
  );
}

export default InfoProfileBox;
