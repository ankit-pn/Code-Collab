import Fcard from './featureCard';
import {
    createStyles,
    Badge,
    Group,
    Title,
    Text,
    Card,
    SimpleGrid,
    Container,
  } from '@mantine/core';
//   import { IconGauge, IconUser, IconCookie } from '@tabler/icons';
 import {MdAutoAwesome,MdPreview} from 'react-icons/md'
 import {FaUsers , FaUserLock} from 'react-icons/fa'
 import {ImUserCheck} from 'react-icons/im'
 import {BiCustomize} from 'react-icons/bi'
  
  const mockdata = [
    {
      title: 'Access control',
      description:
        'Allows administrators to control who has access to the codebase and what level of access they have, ensuring that sensitive information is protected.',
      icon: FaUserLock,
    },
    {
      title: 'User-friendly interface',
      description:
        'Offer a user-friendly interface that is easy to use and navigate, allowing developers to focus on coding instead of navigating through complicated tools.',
        icon: ImUserCheck,
    },
    {
      title: 'Collaborative editing',
      description:
        'Enables multiple developers to work on the same file at the same time, making it easier to collaborate on code in real-time.',
        icon: FaUsers,
    },

    
    
  ];

  const mockdata1=[
    // {
    //   title: 'Secure data storage',
    //   description:'Ensure that all data and code is stored securely, protecting sensitive information and promoting data privacy.',
    // //   icon: IconCookie,
    // },

    {
      title: 'Improved efficiency',
      description:
        'By enabling developers to save changes to the code quickly and easily, the "Save" feature promotes efficiency.',
      icon: MdAutoAwesome,
    },

    {
      title: ' Personalization',
      description:
        ' The "Change Themes" feature offers users the ability to customize the look and feel of the code editor, making it unique and personal to their individual preferences.',
      icon: BiCustomize,
    },

    {
      title: 'Enhanced Code Review',
      description:
        'The ability to adjust font size can be particularly useful during code review, as it can make it easier to spot errors and inconsistencies in the code.',
        icon: MdPreview,
    },

   
  ];
  
  const useStyles = createStyles((theme) => ({
    title: {
      fontSize: 34,
      fontWeight: 900,
      [theme.fn.smallerThan('sm')]: {
        fontSize: 24,
      },
    },
  
    description: {
      maxWidth: 600,
      margin: 'auto',
  
      '&::after': {
        content: '""',
        display: 'block',
        backgroundColor: theme.colors.dark[5],
        width: 45,
        height: 2,
        marginTop: theme.spacing.sm,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
  
    card: {
        backgrounColor: 'hsl(223, 83%, 9%)',
      border: `1px solid ${
        theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1]
      }`,
    },
  
    cardTitle: {
      '&::after': {
        content: '""',
        display: 'block',
        backgroundColor: theme.colors.dark[5],
        width: 45,
        height: 2,
        marginTop: theme.spacing.sm,
      },
    },
  }));
  
  export function FeaturesCards() {
    const { classes, theme } = useStyles();
    const features = mockdata.map((feature,index) => (
      <Fcard  key={index} className={classes.card} >
        <feature.icon size={50} stroke={2} color='white' />
        <Text color="white" size="xl" weight={500} className={classes.cardTitle} mt="md">
          {feature.title}
        </Text>
        <Text size="lg"   color="hsl(226, 51%, 74%)" mt="sm">
          {feature.description}
        </Text>
      
      
      </Fcard>
    ));

    const feature = mockdata1.map((feature,index) => (
      <Fcard  key={index} className={classes.card}  >
        <feature.icon size={50} stroke={2} color='white' />
        <Text color="white" size="xl" weight={500} className={classes.cardTitle} mt="md">
          {feature.title}
        </Text>
        <Text size="lg"   color="hsl(226, 51%, 74%)" mt="sm">
          {feature.description}
        </Text>
      
      
      </Fcard>
    ));

    return (
      <Container size="lg" py="xl">
        <Group position="center">
          <Badge variant="filled" size="lg">
            code collab
          </Badge>
        </Group>
  
        <Title order={1} sx={{fontSize : '42px'}} color="hsl(200, 53%, 39%)" className={classes.title} align="center" mt="sm" >
        Collaboration made simple, effective, and efficient.
        </Title>
  
        <Text color="dimmed" size="22px"  className={classes.description} align="center" mt={'48px'}>
        Code collaboration is the process of merging individual perspectives and skills to create something greater than the sum of its parts.
        </Text>
  
        <SimpleGrid cols={3} spacing="xl" mt={50} breakpoints={[{ maxWidth: 'md', cols: 1 }]}>
          {features}
        </SimpleGrid>

        <SimpleGrid cols={3} spacing="xl" mt={50}  breakpoints={[{ maxWidth: 'lg', cols: 1 }]}>
          {feature}
        </SimpleGrid>

      </Container>
    );
  }