import Navigation from "@/components/navigation";
import Header from "@/components/header";
import { DriveHeader } from "@/components/drive/header";
import Drive from "@/components/drive/drive";
import { Error } from "@/components/error";
import { getSharedFiles } from "@/app/actions";

export const dynamic = "force-dynamic";
export default async function Page() {
  const { files, error } = await getSharedFiles();

  return (
    <div className="flex min-h-screen w-full bg-gray-100/40 dark:bg-gray-800/40">
      <Navigation current="shared" />
      <div className="flex-1 flex flex-col min-h-0">
        <Header />
        <main className="flex-1 overflow-auto p-4">
          {!!error && <Error message={JSON.stringify(error)}></Error>}
          <DriveHeader title="Shared with me" />
          <Drive files={files} droppable={false} />
        </main>
      </div>
    </div>
  );
}
