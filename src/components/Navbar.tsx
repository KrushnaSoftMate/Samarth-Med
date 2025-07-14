import { Box, Flex, Link } from '@chakra-ui/react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <Box bg='teal.500' px={4}>
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <NavLink to='/'><Link color='white'>Home</Link></NavLink>
        <NavLink to='/about'><Link color='white'>About</Link></NavLink>
      </Flex>
    </Box>
  )
}

export default Navbar