import { memo } from 'react';
import { Box, Grid } from '@mui/material';
import { useGetProjectsQuery } from '../api/projectsApi';
import { useSelector } from 'react-redux';
import { getFilter } from '@/features/filter';
import { ProjectsListSkeleton } from '@/widgets/ProjectsList/ui/ProjectsList.skeleton.tsx';
import { ProjectCard } from '@/entities/project';
import { ProjectsListEmpty } from '@/widgets/ProjectsList/ui/ProjectsList.empty.tsx';

export const ProjectsList = memo(() => {
    const filter = useSelector(getFilter);
    const { isFetching, data } = useGetProjectsQuery(filter);

    if (isFetching) {
        return <ProjectsListSkeleton amount={filter.pageSize / 2} />;
    }

    if (!data?.items?.length) {
        return <ProjectsListEmpty />;
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2} alignItems="center">
                {data.items.map(item => (
                    <Grid key={item.id} item xs={12} md={6} lg={4} xl={3}>
                        <ProjectCard {...item} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
});
