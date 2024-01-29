export const defaultCmdList: CmdItem[] = [
  {
    id: 'eFBB2C9c-EfB2-af7F-Dd9e-c2cFC8530594',
    title: 'Code Diff Generator',
    subTitle: 'Prepare for SSRB',
    template: 'cd [repo]\ngit diff [tagA] [tagB] -- . ":!package.json" > [repo]/[v1]-[v2].diff',
    variables: {
      '[repo]': '',
      '[tagA]': '',
      '[tagB]': '',
      '[v1]': '',
      '[v2]': '',
    },
  },
];
