import ThreadsList from '../components/ThreadsList';
const meta = {
    title: 'Messenger/ThreadsList',
    component: ThreadsList,
};
export default meta;
export const Default = {
    args: {
        onSelectThread: (t) => console.log('Selected', t.id),
    },
};
//# sourceMappingURL=ThreadsList.stories.js.map