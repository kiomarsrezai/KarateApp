type DownloadRegistrationCardPageProps = {
  params: Promise<{
    id: string;
  }>;
};
const RegistrationCardPage = async ({
  params,
}: DownloadRegistrationCardPageProps) => {
  const { id } = await params;

  /**
   * get user data
   * render registration card
   * download registration card in useEffect
   */

  return <div></div>;
};

export default RegistrationCardPage;
