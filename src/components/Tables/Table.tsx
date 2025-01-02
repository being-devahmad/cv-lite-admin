import React from "react";
import Image from "next/image";
import Link from "next/link";

interface TableColumn {
  key: string;
  header: string;
  render?: (item: any) => React.ReactNode;
}

interface TableProps {
  data: any[];
  columns: TableColumn[];
}

const Table: React.FC<TableProps> = ({ data, columns }) => {
    return (
        <div className="rounded-[10px] border border-stroke bg-white p-4 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5">
            <div className="max-w-full overflow-x-auto">
                <table className="w-full table-auto">
                    <thead>
                        <tr className="bg-[#F7F9FC] text-left dark:bg-dark-2">
                            {columns.map((column) => (
                                <th key={column.key} className="min-w-[120px] px-4 py-4 font-medium text-dark dark:text-white xl:pl-7.5">
                                    {column.header}
                                </th>
                            ))}
                          
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index}>
                                {columns.map((column) => (
                                    <td
                                        key={column.key}
                                        className={`border-[#eee] px-4 py-4 dark:border-dark-3 ${index === data.length - 1 ? "border-b-0" : "border-b"
                                            }`}
                                    >
                                        {column.render ? column.render(item) : item[column.key]}
                                    </td>
                                ))}
                               
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Table;
