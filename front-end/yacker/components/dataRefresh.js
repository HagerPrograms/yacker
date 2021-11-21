import { useRouter } from 'next/router';

function RefreshData(url){
    const router = useRouter();
    const refreshData = () => {
        router.replace(router.asPath);
    }
}

export default RefreshData;