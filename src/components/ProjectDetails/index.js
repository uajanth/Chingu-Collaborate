import {
    Flex,
    Heading,
    Text,
    HStack,
    TagLabel,
    Tag,
    Button,
} from '@chakra-ui/react'
import { BiUser, BiTimeFive, BiHourglass } from 'react-icons/bi'
import { DateTime } from 'luxon'

function ProjectDetails({ project, admin }) {
    const currentDate = DateTime.now()
    const expirationDate = DateTime.fromISO(project.expiresIn)
    const difference = expirationDate.diff(currentDate, ['days'])
    const remainingDays = `${Math.round(difference.toObject().days)} days`

    const isJoinable = true
    const isReported = false

    return (
        <Flex
            borderWidth="2px"
            borderRadius="lg"
            width="90%"
            padding="2rem"
            flexDirection="column"
            textAlign="left"
            gap={2}
        >
            <Flex align="center" justify="space-between">
                <Heading size="lg">{project.title}</Heading>
            </Flex>
            <Flex gap={10}>
                <Flex align="center" gap={1}>
                    <BiUser />
                    <Heading
                        size="sm"
                        fontWeight={500}
                    >{`${admin.username}`}</Heading>
                </Flex>
                <Flex align="center" gap={1}>
                    <BiTimeFive />
                    <Heading size="sm" fontWeight={500}>
                        {admin.location}
                    </Heading>
                </Flex>
            </Flex>
            <Flex align="center" gap={1}>
                <BiHourglass />
                <Heading
                    size="sm"
                    fontWeight={500}
                    color="red.500"
                >{`Expires in ${remainingDays}`}</Heading>
            </Flex>

            <HStack spacing={2}>
                {project?.technologies?.map((tech, index) => (
                    <Tag key={index} variant="solid" colorScheme="gray">
                        <TagLabel>{tech}</TagLabel>
                    </Tag>
                ))}
            </HStack>
            <Button
                width="fit-content"
                colorScheme={isJoinable ? 'green' : 'gray'}
                cursor={isJoinable ? 'pointer' : 'not-allowed'}
                marginBottom={4}
            >
                {isJoinable ? 'Request' : 'Requested'}
            </Button>
            <hr />
            <Flex direction="column" marginBottom={4}>
                <Heading size="md" marginTop={4} marginBottom={2}>
                    Description
                </Heading>
                <Text fontSize="md">{project.details}</Text>
            </Flex>
            <hr />
            <Button
                width="fit-content"
                color="white"
                backgroundColor={isReported ? 'gray.400' : 'gray.900'}
                marginTop={4}
            >
                {isReported ? 'Reported' : 'Report'}
            </Button>
        </Flex>
    )
}

export default ProjectDetails
