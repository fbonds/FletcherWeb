export function getTimeOfDay() {
  const hour = new Date().getHours()
  
  if (hour >= 5 && hour < 12) {
    return { greeting: 'Good morning', emoji: '🌅' }
  } else if (hour >= 12 && hour < 17) {
    return { greeting: 'Good afternoon', emoji: '☀️' }
  } else if (hour >= 17 && hour < 21) {
    return { greeting: 'Good evening', emoji: '🌆' }
  } else {
    return { greeting: 'Good evening', emoji: '🌙' }
  }
}

export function detectOS() {
  const userAgent = window.navigator.userAgent.toLowerCase()
  const platform = window.navigator.platform.toLowerCase()
  
  if (/iphone|ipad|ipod/.test(userAgent)) {
    return { 
      os: 'iOS', 
      version: 'iOS 3.0',
      message: "I've been supporting iOS devices since version 3.0"
    }
  }
  
  if (/android/.test(userAgent)) {
    return { 
      os: 'Android', 
      version: 'Android Jelly Bean 4.1',
      message: "I've been supporting Android since Jelly Bean 4.1"
    }
  }
  
  if (/mac/.test(platform) || /macintosh/.test(userAgent)) {
    return { 
      os: 'macOS', 
      version: 'System 7',
      message: "I've been supporting Mac systems since System 7"
    }
  }
  
  if (/win/.test(platform) || /windows/.test(userAgent)) {
    return { 
      os: 'Windows', 
      version: 'Windows 3.1',
      message: "I've been working with Windows since version 3.1"
    }
  }
  
  if (/linux/.test(platform) || /linux/.test(userAgent)) {
    return { 
      os: 'Linux', 
      version: 'Slackware 2.x',
      message: "I've been in the Linux world since Slackware 2.x"
    }
  }
  
  return { 
    os: 'Unknown', 
    version: '',
    message: "I've worked with every major operating system"
  }
}

export function isReturningVisitor() {
  const visited = localStorage.getItem('hasVisited')
  if (!visited) {
    localStorage.setItem('hasVisited', 'true')
    localStorage.setItem('firstVisit', new Date().toISOString())
    return false
  }
  return true
}

export function getPersonalizedGreeting() {
  const { greeting, emoji } = getTimeOfDay()
  const osInfo = detectOS()
  const isReturning = isReturningVisitor()
  
  if (isReturning) {
    return {
      text: `${greeting}! Welcome back from a fellow ${osInfo.os} user.`,
      emoji,
      isReturning: true
    }
  }
  
  return {
    text: `${greeting}! I see you're on ${osInfo.os} - ${osInfo.message}.`,
    emoji,
    isReturning: false
  }
}
