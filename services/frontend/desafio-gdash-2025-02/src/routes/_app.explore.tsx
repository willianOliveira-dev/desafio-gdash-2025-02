import { ExploreList } from '@/components/features/explore/explore-list';
import { Header } from '@/components/features/explore/layout/header';
import { Content } from '@/components/layout/content';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_app/explore')({
    component: Explore,
});

function Explore() {
    return (
        <Content>
            <Header />
            <ExploreList />
        </Content>
    );
}
