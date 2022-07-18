import { Avatar, Box, Button, Flex, FlexProps, HStack, IconButton, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text, useColorModeValue, VStack, } from '@chakra-ui/react'
import { ethers } from "ethers";
import { useEffect,useState } from 'react';


export default function  NavigationWithConnected (){
  const [balance, setBalance] = useState<String | undefined>()
const [address, setAddress] = useState<String | undefined>()
  useEffect(() => {
    //client side code
    if(!window.ethereum) return

    const provider = new ethers.providers.Web3Provider(window.ethereum)
    provider.getBalance("ethers.eth").then((result)=>{
      setBalance(ethers.utils.formatEther(result))
    })
  })

  function connect(){
    //client side code
    if(!window.ethereum) return

    const provider = new ethers.providers.Web3Provider(window.ethereum)
    window.ethereum.enable().then(()=>{
      const signer = provider.getSigner()
      signer.getAddress().then((result)=>{setAddress(result)})
    })
  }
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="16"
      alignItems="center"
      className="bg-white"
      // bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
    >
      <Box className="px-2">
        <Button onClick={connect} 
          variant="solid"
          colorScheme="pink"
          bg="pink.400"
          color="white"
          size="md"
          rounded="3xl"
        >
          Connect Wallet
        </Button>
        <Box className="px-2"  
        > Address: {address} </Box>

        
      </Box>


    </Flex>
  )
}
