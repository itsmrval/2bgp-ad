# Get the SerialNumber using wmic and trim any whitespace
$serialNumber = (wmic bios get SerialNumber | findstr [0-9]).Trim()

# Extract the numbers
$numbers = $serialNumber -split '/'

# Check if there are exactly three numbers
if ($numbers.Count -eq 3) {
    # Format the network configuration
    $ipAddress = "10.{0}.{1}.{2}" -f $numbers[0].Trim(), $numbers[1].Trim(), $numbers[2].Trim()
    $defaultGateway = "10.{0}.0.254" -f $numbers[0].Trim(), $numbers[1].Trim()
    $dnsServer = "10.{0}.{1}.1" -f $numbers[0].Trim(), $numbers[1].Trim()
    
    Write-Output "Configuring network with IP Address: $ipAddress"
    Write-Output "Default Gateway: $defaultGateway"
    Write-Output "DNS Server: $dnsServer"
    
    try {
        # Get the network adapter (assuming Ethernet, but you might want to adjust this)
        $adapter = Get-NetAdapter -Name "Ethernet" -ErrorAction Stop
        
        # Remove existing IP addresses on this interface
        Write-Output "Removing existing IP addresses..."
        Get-NetIPAddress -InterfaceIndex $adapter.InterfaceIndex -AddressFamily IPv4 -ErrorAction SilentlyContinue | Remove-NetIPAddress -Confirm:$false
        
        # Remove existing default routes (more targeted approach)
        Write-Output "Checking for existing default routes..."
        $existingRoutes = Get-NetRoute -DestinationPrefix "0.0.0.0/0" -ErrorAction SilentlyContinue
        if ($existingRoutes) {
            Write-Output "Removing existing default routes..."
            $existingRoutes | Remove-NetRoute -Confirm:$false
        } else {
            Write-Output "No existing default routes found."
        }
        
        # Set the new IP address with default gateway
        Write-Output "Setting new IP address and default gateway..."
        New-NetIPAddress -InterfaceIndex $adapter.InterfaceIndex -IPAddress $ipAddress -PrefixLength 16 -DefaultGateway $defaultGateway -AddressFamily IPv4
        
        # Set the DNS server address
        Write-Output "Setting DNS server..."
        Set-DnsClientServerAddress -InterfaceIndex $adapter.InterfaceIndex -ServerAddresses $dnsServer
        
        Write-Output "Network configuration completed successfully."
        Write-Output "New IP Address: $ipAddress"
        Write-Output "Subnet Mask: 255.255.0.0 (/16)"
        Write-Output "Default Gateway: $defaultGateway"
        Write-Output "DNS Server: $dnsServer"
        
    } catch {
        Write-Error "Failed to configure network: $($_.Exception.Message)"
        
        # Alternative approach if the above fails
        Write-Output "Attempting alternative configuration method..."
        try {
            # Use netsh as fallback
            netsh interface ip set address "Ethernet" static $ipAddress 255.255.0.0 $defaultGateway
            netsh interface ip set dns "Ethernet" static $dnsServer
            Write-Output "Network configured using netsh command."
        } catch {
            Write-Error "Both PowerShell and netsh methods failed. Please check network adapter name and permissions."
        }
    }
    
} else {
    Write-Output "The serial number format is not as expected. Found $($numbers.Count) numbers instead of 3."
    Write-Output "Serial number parts: $($numbers -join ', ')"
}